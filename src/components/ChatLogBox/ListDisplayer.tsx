export function ListDisplayer(data: { filenames: string[] }) {
    return (
        <>
            <div className="flex flex-col justify-center">
                <ol className="max-w-md space-y-1 list-decimal list-inside dark:text-gray-400">
                    {
                        data.filenames.map((value) => (
                            <li>{value}</li>
                        ))
                    }
                </ol>
            </div>
        </>
    )
}

