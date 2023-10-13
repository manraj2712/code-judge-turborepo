import { useEffect, useState } from "react";

export default function ProblemDescription({ description }: { description: string }) {

    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);
    
    return (
        <div>
            {mounted &&  <p style={{
                lineHeight: "1.5",
                textAlign: "justify",
            }} dangerouslySetInnerHTML={{ __html: description }} />}
        </div>
    )
}