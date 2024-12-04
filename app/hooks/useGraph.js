import { useState, useEffect } from "react";

function useGraph() {
  const [graph, setGraph] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGraphJSON = async () => {
      setLoading(true);
      try {
        const graphResponse = await fetch("/graph.json");

        const graphJSON = await graphResponse.json();

        setGraph(graphJSON);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    loadGraphJSON();
  }, []);

  return {
    graph,
    loading,
    error,
  };
}

export default useGraph;
