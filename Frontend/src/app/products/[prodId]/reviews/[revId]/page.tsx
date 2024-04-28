import { notFound } from "next/navigation";

export default function ReviewDetails({params}:{
    params:{prodId: string; revId: string;}
})
{
    if(parseInt(params.revId) > 1000)
        {
            notFound();
        }
    return <h1>Review {params.revId} of {params.prodId}</h1>
}