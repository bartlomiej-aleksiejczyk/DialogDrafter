export function ObjectDisplayer(data: Record<string, unknown>) {
    return (
        <>
            <tbody>
                {
                    Object.entries(data).map(([key, value]) => (
                        <tr>
                            <td>{key}</td>
                            <td>{value}</td>
                        </tr>
                    ))
                }
            </tbody>
        </>
    )
}

