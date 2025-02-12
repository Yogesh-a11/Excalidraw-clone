 "use client"
import axios from 'axios'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {
    const [spaces, setSpaces] = useState([]);
    const [error, setError] = useState('')
    const router = useRouter()

    

        useEffect(() => {
            const fetchSpace = async () => {
            try {
                const token = localStorage.getItem("token")
                if (!token) {
                    console.error("Unauthorized")
                    router.push("/auth/sign-in")
                }


                const response = await axios.get("http://localhost:3001/api/v1/space/spaces", {
                    headers: {Authorization: `Bearer ${token}`}
                })
                setSpaces(response.data.spaces)
            } catch (error) {
                console.log("Error fetching spaces", error)
                setError("Failed to fetch spaces. please try again")
            }
        }
        fetchSpace()
    },[])
    

    return (
        <div>
            <h1>Spaces</h1>
            {error && <p>{error}</p>}
            {spaces.length > 0 ? (
        <ul>
            {spaces.map((space: any) => (
                <li key={space.id}>
                {space.slug}{" "}
                <Link href={`/space/${space.id}`}>
                    <>View Details</>
                </Link>
                </li>
            ))}
            </ul>
        ) : (
            <p>No spaces found.</p>
        )}
        </div>
    )
}

export default page
