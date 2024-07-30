'use client'
import axios from "axios"
import { useEffect, useState } from "react"

export default function Home() {
  const [dataSource, setDataSource] = useState('')
  const [numbers, setNumbers] = useState([])
  const [doubleCount, setDoubleCount] = useState(0)
  const [sortAsc, setSortAsc] = useState(false)
  const [sortDesc, setSortDesc] = useState(false)
  const [flipNumbers, setFlipNumbers] = useState([])

  const getDataSource = async () => {
    let dominoes = []
    let doubles = 0
    let dominoSums = []
    let flippedDominoes = []
    let uniqueDominoes = []

    try {
      // Get source data
      const response = await axios.get(`https://pwd-selectiontest-api.vercel.app/domino/array-type-two`, {
        headers: {
          'auth': 'JCwd'
        }
      })

      const numData = response.data.data.number.typeTwo
      console.log(numData)
      setDataSource(numData)

      const tempData = numData.split(', ')
      console.log(tempData)

      for(let i = 0; i < tempData.length; i++){
        const domino = []
        domino.push(parseInt(tempData[i][0]), parseInt(tempData[i][2]))
        dominoes.push(domino)
      }

      console.log(dominoes)
      setNumbers(dominoes)
      
      // Finding count if both values in a domino are same
      for(let i = 0; i < dominoes.length; i++){
        if(dominoes[i][0] == dominoes[i][1]){
          doubles++
        }
      }
      
      setDoubleCount(doubles)

      /*const uniqueSums = []

      for(let i = 0; i < dominoes.length; i++){
        const dominoSum = dominoes[i][0] + dominoes[i][1]
        dominoSums.push(dominoSum)
        if(!uniqueSums.includes(dominoSum)){
          uniqueSums.push(dominoSum)
          uniqueDominoes.push(dominoes[i])
        }
      }
      console.log(uniqueDominoes)
      console.log(dominoSums)
      console.log(uniqueSums)

      for(let i = 0; i < dominoes.length; i++){
        const flipped = []
        for(let j = dominoes[i].length - 1; j >= 0; j--){
          flipped.push(dominoes[i][j])
        }
        flippedDominoes.push(flipped)
      }
      console.log(flippedDominoes)*/
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDataSource()
  }, [])

  const handleSortAscending = async () => {
    let sum = el => el.reduce((a,b) => a + b)
    const sortedNumbersAsc = [...numbers].sort((a, b) => sum(a) - sum(b))
    setNumbers(sortedNumbersAsc)
    setSortAsc(true)
    setSortDesc(false)
  }

  const handleSortDescending = async () => {
    let sum = el => el.reduce((a,b) => a + b)
    const sortedNumbersDesc = [...numbers].sort((a, b) => sum(b) - sum(a))
    setNumbers(sortedNumbersDesc)
    setSortAsc(true)
    setSortDesc(false)
  }

  const handleFlippedDominoes = async () => {
    const flippedNumbers = []

    for(let i = 0; i < numbers.length - 1; i++){
      const flippedDomino = numbers[i].reverse()
      flippedNumbers.push(flippedDomino)
    }
    setFlipNumbers(flippedNumbers)
  }

  const handleRemoveDuplicates = async () => {
    const uniqueSums = []
    const unique = []

    for(let i = 0; i < numbers.length; i++){
      const sum = numbers[i][0] + numbers[i][1]
      if(!uniqueSums.includes(sum)){
        uniqueSums.push(sum)
        unique.push(numbers[i])
      }
    }
    setNumbers(unique)
  }

  const handleFilterDominoes = async () => {
    const filteredNumbers = []
    const filtering = parseInt(document.getElementById('filter').value);

    for(let i = 0; i < numbers.length; i++){
      const sum = numbers[i][0] + numbers[i][1]
      if(filtering !== sum){
        filteredNumbers.push(numbers[i])
      }
    }
    setNumbers(filteredNumbers)
  }

  const handleReset = async () => {
    getDataSource()
  }

  return (
    <main className="flex flex-col m-4 gap-2">
      <h1 className="text-3xl font-bold">Dominoes</h1>
      <div>
        <h2 className="font-bold">Source</h2>
        <div>{dataSource}</div>
      </div>
      <div>
        <h2 className="font-bold">Double Numbers</h2>
        <div>{doubleCount}</div>
      </div>
      <div className="flex flex-row">
        {
          numbers?.map((number, index) => {
            return (
              <div key={index} className="border border-2 p-2">
                <div>{number[0]}</div>
                <div>-</div>
                <div>{number[1]}</div>
              </div>
            )
          })
        }
      </div>
      <div className="flex gap-2">
        <button className="btn bg-sky-500 rounded p-2" onClick={handleSortAscending}>Sort (ASC)</button>
        <button className="btn bg-sky-500 rounded p-2" onClick={handleSortDescending}>Sort (DESC)</button>
        <button className="btn bg-sky-500 rounded p-2" onClick={handleFlippedDominoes}>Flip</button>
        <button className="btn bg-sky-500 rounded p-2" onClick={handleRemoveDuplicates}>Remove Dup</button>
        <button className="btn bg-sky-500 rounded p-2" onClick={handleReset}>Reset</button>
      </div>
      <div>
        <form onClick={handleFilterDominoes}>
          <input id="filter" type="text" />
          <button type="button" className="btn bg-sky-500 rounded p-2">Remove</button>
        </form>
      </div>
    </main>
  )
}
