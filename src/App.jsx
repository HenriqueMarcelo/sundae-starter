import Options from "./pages/entry/Options";
import { SummaryForm } from "./pages/summary/SummaryForm";

function App() {
  return (
    <div>
      <h1>Sundaes on Demand</h1>
      <SummaryForm />
      <Options optionType="toppings" />
      <Options optionType="scoops" />
    </div>
  );
}

export default App;
