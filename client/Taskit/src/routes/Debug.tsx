import React, { useState } from 'react'
type props = {
    name: string,
    status: string
}

function Showboys({ name, status }: props) {
    const [boystatus, setboystatus] = useState(status)
    return (
        <>
            <div className='flex gap-2 justify-center my-2'>
                <div>
                    {name}:
                </div>
                <div>
                    <input type='button' className='bg-green-500 rounded-lg p-1'value={boystatus} onClick={()=>{
                        setboystatus("millionaire")
                    }}/>
                       
                </div>
            </div>
        </>
    )

}

function Debug() {
    const [boys, setboys] = useState([
        { name: "Palash", status: "broke" },
        { name: "Tony", status: "billionaire" },
        { name: "Steve", status: "well to do" },
        { name: "Stephen", status: "millionaire" },
        { name: "Bruce", status: "well to do" },
        { name: "Natasha", status: "well to do" },
        { name: "Loki", status: "well to do" },
    ]
    )

    const [boys2, setboys2] = useState(boys)
    return (
        <>
            {boys2.map((item, index) => {
                return <Showboys name={item.name} status={item.status} key={item.name} />
            })}
            <button type="button" className='rounded-lg bg-green-600 p-2' onClick={() => {
                setboys2(boys2.filter(b => b.status === "well to do"))
            }}>
                Filter
            </button>
        </>
    )
}

export default Debug