import {FormRow,FormRowSelect} from '.'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/SearchContainer'

export default function SearchContainer() {

  const {
    isLoading,
    search,
    loanStatus,
    sort,
    sortOptions,
    statusOptions,
    handleChange,
    clearFilters
  }= useAppContext()


  const handleSubmit= (e)=>{
    e.preventDefault();
    clearFilters()
  }

  const handleSearch=(e)=>{
    if(isLoading) return
    handleChange({name:e.target.name,value:e.target.value})
  }

  return (
    <Wrapper>
      <form className='form'>
        <h4>search form</h4>
        {/* search position */}
        <div className='form-center'>
          <FormRow labelText={'search'} type='text' name='search' value={search} handleChange={handleSearch}/>
          {/* rest of the inputs */}
          <FormRowSelect labelText={'Credit worthiness'} name='loanStatus' value={loanStatus} handleChange={handleSearch} list={['all',...statusOptions]}/>
          <FormRowSelect labelText='sort' name='sort' handleChange={handleSearch} value={sort} list={sortOptions}/>

          <button className='btn btn-block btn-danger'onClick={handleSubmit} disabled={isLoading}>
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  )
}
