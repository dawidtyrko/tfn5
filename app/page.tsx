import Image from "next/image";
// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
      <div  style={{ textAlign: "center", paddingTop: 20, paddingBottom: 20 }}>
          <h1><span className="home-title">WELCOME </span> TO MY <span className="home-title"> PRODUCTS </span>APP</h1>
      </div>
  );
}
