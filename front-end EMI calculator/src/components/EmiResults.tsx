const EmiResults = (props: any) => {
    return (
        <div className="px-5">
            <div className="flex space-x-4">
                {(Math.round(props.result.emi * 100) / 100).toFixed(2)}
            </div>
        </div>
    );
};

export default EmiResults;