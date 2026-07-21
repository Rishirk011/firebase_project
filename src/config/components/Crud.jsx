import { useEffect, useState } from "react"
import { auth,db } from "../firebase.config";
import { 
    getDocs,
    collection, 
    addDoc, 
    deleteDoc, 
    doc,
    onSnapshot,
    updateDoc
} from "firebase/firestore";

export default function Crud(){

    const [books,setBooks] = useState([]);

    const [newBook,setNewBook] = useState("");
    const [newDescription,setNewDescription] = useState("");
    const [newQuantity,setNewQuantity] = useState(0);

    //update title
    const [newName,setNewName] = useState("");

    useEffect(() => {
    // This listens to live updates in Firestore directly
    const unsubscribe = onSnapshot(booksCollection, (snapshot) => {
        const filteredData = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }));
        setBooks(filteredData);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
}, []);    
     async function getList(){
            try{
                const data = await getDocs(booksCollection);
                
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }));

                setBooks(filteredData);
                   
            }
            catch(err){
                console.log(err);
            }
        };
    const booksCollection = collection(db,"books");
    useEffect(()=>{
       
        getList();
    
    },[]);

    async function addBook(){
        try{
            await addDoc(booksCollection, {
                bookName: newBook, description: newDescription,
                quantity: newQuantity,
                userId: auth?.currentUser?.uid
            });

            getList();
        
        }catch(err){
            console.log(err);
        }
    }

    async function deleteBook(id){
        
        try{
            const bookDoc = doc(db,"books",id);
            await deleteDoc(bookDoc);
        }
        catch(err){
            console.log(err);
        }

    }
       async function updateBook(id){
        
        try{
            const bookDoc = doc(db,"books",id);
            await updateDoc(bookDoc, {bookName: newName});
            setNewBook("");
        }
        catch(err){
            console.log(err);
        }

    }
    return <>

       {auth?.currentUser?.email ?
       <div className="container my-6">
            {books.map((m)=> <p key={m.id}>
            
                {m.bookName + " "}

            <button className="btn btn-danger"
            onClick={()=>deleteBook(m.id)}>
            
                delete
            
            </button>
            {" "}
            
            <input type="text" placeholder="update name"
            onChange={(e)=>setNewName(e.target.value)
            } />
            
            {" "}

            <button 
            className="btn btn-primary"
            onClick={()=>updateBook(m.id)}>
                update
            </button>
            
            </p>)}
            
        </div>:""}

      <div className="container">
            <h1>create new book</h1>
            <p>
                <input type="text" name="" id="" placeholder="book name"
                onChange={(e)=>setNewBook(e.target.value)}/>
            </p>
            <p>
                <input type="text" 
                placeholder="description"
                onChange={(e)=>setNewDescription(e.target.value)}
                />
            </p>
            <p>
                <input type="number" 
                placeholder="quantity"
                onChange={(e)=>setNewQuantity(e.target.valueAsNumber)}
            />
            </p>
            <button onClick={addBook}
            className="btn btn-success">
                add
            </button>

      </div>


    </>
}