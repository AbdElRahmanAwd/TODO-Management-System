import api from "./config/axios";

function App() {
  api.get("/health").then((response) => {
    console.log("API Health Check:", response.data);
  });
  return (
    <div className="card-body text-center">
      <h1>TODO APP</h1>
    </div>
  );
}

export default App;
