import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import CodeEditor from '../components/CodeEditor'
import CodeServerAPI from '../lib/interpreter/server'
import MenuBar from '../components/MenuBar'
import { cellObject, outputError } from '../lib/typings/types'
import { useSelector, useDispatch } from 'react-redux';


const Home: NextPage = () => {
  const { interpreterMode } = useSelector((state: any) => state.app)

  const [cellObject, setCellObject] = useState<cellObject>({})
  const [currCellLanguage, setCurrCellLanguage] = useState('javascript')
  const [output, setOutput] = useState("")
  const [outputError, setOutputError] = useState("")
  const [hasError, setHasError] = useState(false)

  const handleCellChange = (cellId: string, value: string, language: string) => {
    const newCellObj = { ...cellObject, [cellId]: { content: value, language } }
    setCellObject(newCellObj)
    setCurrCellLanguage(language)
  }

  const handleCellRunCallback = (accumulatedResult: string | outputError, hasErrors: boolean) => {
    if (hasErrors) {
      setHasError(true)
      //format error message for displaying
      const errorMessage = (accumulatedResult as outputError).output.split('\n')[0]
      const errorName = (accumulatedResult as outputError).name
      const fullErrorMessage = errorName + ': ' + errorMessage
      setOutputError(fullErrorMessage)
    } else {
      setHasError(false)
      setOutput(accumulatedResult as string)

    }
  }

  const handleCellRun = (cellId: string) => {
    const content = cellObject[cellId].content
    if (interpreterMode === 'node') {
      CodeServerAPI.exec(content, currCellLanguage, handleCellRunCallback)
        .catch((error) => {
          setOutputError({
            ...error,
          })
          console.log(error)
        })
    } else {
      //execute in browser context
      console.log('browser')
    }
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MenuBar />
      <CodeEditor
        cellId={"1"}
        onCellChange={handleCellChange}
        onCellRun={handleCellRun}
      />
      <CodeEditor
        cellId={"2"}
        onCellChange={handleCellChange}
        onCellRun={handleCellRun}
      />
      <br />
      <br />
      {hasError ? (
        <div className="text-red-400 p-3" dangerouslySetInnerHTML={{ __html: outputError }}>

        </div>
      ) : (
        <textarea
          className="m-2 w-96 h-96"
          value={output}
        />
      )}
    </div>
  )
}

export default Home
