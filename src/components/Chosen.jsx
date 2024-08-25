const Chosen = ({ children }) => {
    return (
        <div id="chosen-one" className="shadow-lg p-4 bg-gradient-to-b from-yellow-300 to-green-600 text-white px-4 border-inset rounded-full">
            {children}
        </div>
    )
}
export default Chosen