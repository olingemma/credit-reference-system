import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';
import Loading from './Loading';
import Client from './Client';
// import Alert from './Alert';
import Wrapper from '../assets/wrappers/JobsContainer';
import PageBtnContainer from './PageBtnContainer';

const ClientsContainer = () => {
  const {
    isLoading,
    totalClients,
    clients,
    getClients,
    search,
    loanStatus,
    sort,
    numOfPages,
    page
  } = useAppContext();
  
  useEffect(() => {
    getClients();
    // eslint-disable-next-line
  }, [page,search,loanStatus,sort]);

  if (isLoading) {
    return <Loading center />;
  }

  if(totalClients<1){
    return (
      <Wrapper>
        <h2>No clients to display...</h2>
      </Wrapper>
  );
}  
  return (
    <Wrapper>
      <h5>
        {totalClients} Client{clients.length > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {clients.map((client) => {
          return <Client key={client._id} {...client} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default ClientsContainer;
