
import './App.css';
import Table from './Components/TableUsers/index';
import Grid from '@material-ui/core/Grid';

function App() {
  return (
    <div className="App">
      <Grid container spacing={2}>
      <Grid item xs={12}>
      <Table></Table>
      </Grid>
      </Grid>
    </div>
  );
}

export default App;
