import React from 'react'
import { Link,useParams  } from 'react-router-dom'

const  IssueList = () => {
  const { projectId } = useParams();
  // console.log("projectId:", projectId);
  return (
    <div className='bg-slate-900 h-screen'>

        <main className='mx-auto max-w-3xl pt-10'>
        <header>
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search Issues"
            className="w-full max-w-md px-4 py-2 rounded-md text-white bg-slate-900 border border-gray-700"
          />
 <Link to={`/createissue/${projectId}`}          
            className="bg-green-700 flex gap-1 text-white px-4 py-2 rounded-md"
          >
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H6q-.425 0-.712-.288T5 12t.288-.712T6 11h5V6q0-.425.288-.712T12 5t.713.288T13 6v5h5q.425 0 .713.288T19 12t-.288.713T18 13h-5v5q0 .425-.288.713T12 19t-.712-.288T11 18z" /></svg>
            </div>
            <p className="font-semibold">New Issue</p>
          </Link>
        </div>
        </header>
        </main>
    </div>
  )
}

export default IssueList