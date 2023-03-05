import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";

export default function Dashboard() {
    const [mood, setMood] = useState("")
    const router = useRouter();

    useEffect(() => {
        if (router.isReady) {
            const emotion = router.query.mood;
            setMood(emotion);
        }
    }, [router.isReady]);

    return (
        <div className="bg-black h-screen">
            <main>
                {/* Sidebar */}
                <Sidebar />
                {/* Center */}
            </main>

            <div>
                {/* Palyer */}
            </div>
        </div>
    )
}