

const cellOutputRenderer = ({ output, hasError, outputError }: { output: string, hasError: boolean, outputError: string }) => {
    return (
        <div>
            {hasError ? (
                <div className="text-red-400 p-3" dangerouslySetInnerHTML={{ __html: outputError }}></div>
            ) : (
                <div>
                    <div className="p-3" dangerouslySetInnerHTML={{ __html: output }}></div>
                </div>
            )}
        </div>
    )
}

export default cellOutputRenderer;