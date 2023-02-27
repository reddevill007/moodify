import { useRouter } from "next/router"
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [mood, setMood] = useState("sad")
    const router = useRouter();

    useEffect(() => {
        if (router.isReady) {
            const emotion = router.query.mood;
            setMood(emotion);
        }
    }, [router.isReady]);

    return (
        <div>
            <h1>{mood}</h1>
        </div>
    )
}