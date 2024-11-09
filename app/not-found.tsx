import Link from 'next/link';

export default function NotFound(){
    return(
        <div style={{margin: 'auto', width: '30vw', background: '#982525', borderRadius: '10px', textAlign: 'center'}}>
            <h2>Not Found</h2>
            <p>Could not find requested resource</p>
            <Link href="/" style={{backgroundColor:'black', border:'1px solid black', borderRadius:'10px'}}>return home</Link>
        </div>
    )
}