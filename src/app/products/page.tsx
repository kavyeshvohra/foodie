import Link from "next/link";

export default function ProductList()
{
    return (
    <>
        <Link href='/'>Home</Link>
        <h1>Product List:</h1>
        <ul>
            <li><Link href='/products/1'>Product 1</Link></li>
            <li>Product 2</li>
            <li>Product 3</li>
        </ul>
    </>
    );
}