import { Metadata } from "next"
import Link from "next/link";

type Props = {
    params:{
        prodId: string;
    };
};

export const generateMetadata = async ({params}: Props): Promise<Metadata> => {
    const title = await new Promise((resolve) => {
        setTimeout(()=>{
            resolve(`iPhone ${params.prodId}`);
        },100);
    });
    return{
        title: `Product: ${title}`,
    };
};
export default function ProductDetails({params} : Props)
{
    return(
        <>
            <h1>Details about Product {params.prodId}</h1>
        </>
    )
}