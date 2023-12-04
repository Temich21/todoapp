import FilterToDo from "../FilterToDo/FilterToDo"

const Header = () => {
    return (
        <header className="flex justify-between items-center">
            <h1 className='text-5xl font-bold'>To Do App</h1>
            <FilterToDo />
        </header>
    )
}

export default Header