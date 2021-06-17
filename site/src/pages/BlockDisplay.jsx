import { useEffect } from "react";


export default function BlockDisplay({route}){
    useEffect(() => {
        console.log(route.params._id)
    } ,[])

    return (
        <div>
            {route.params._id}
            Hello World
        </div>
    )
}