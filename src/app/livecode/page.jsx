'use client'
import axios from "axios"
import { useEffect, useState } from "react"

export default function LiveCodePage(){
    const [dataSource, setDataSource] = useState([])
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    const [letterCount, setLetterCount] = useState([])

    const getDataSource = async () => {
        let letterCounts = []
        try {
            const response = await axios.get('https://www.random.org/strings/?num=10&len=32&upperalpha=on&unique=off&format=plain')

            const alphabetData = response.data
            console.log(alphabetData)
            setDataSource(alphabetData)

            for(let i = 0; i < alphabet.length; i++){
                let countedLetters = 0
                for(let j = 0; j < alphabetData.length; j++){
                    if(alphabetData[j] == alphabet[i]){
                        countedLetters++
                    }
                }
                console.log(alphabet[i] + ": " + countedLetters)
                letterCounts.push(countedLetters)
            }
            setLetterCount(letterCounts)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDataSource()
    }, [])

    return (
        <main className="flex flex-col m-4 gap-2">
            <h1 className="text-3xl font-bold">Live Code Test</h1>
            <div>
                <div>{dataSource}</div>
            </div>
            <div className="flex flex-col px-8 py-4 border border-2 items-center">
                <h2 className="text-2xl font-bold">Counted Letters</h2>
                {
                    letterCount.map((count, index) => {
                        return (
                            <div key={index} className="flex flex-row gap-2">
                                {alphabet[index]} : <div className="text-red-500">{count}</div>
                            </div>
                        )
                    })
                }
            </div>
        </main>
    )
}