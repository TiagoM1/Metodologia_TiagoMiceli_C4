import { useState } from "react";
import styles from "./SearchBar.module.css";
import { useTask } from "../../../../hooks/useTasks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export function SearchBarTask() {
  const [query, setQuery] = useState("");
  const { actionSearch, getTask } = useTask();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    if (event.target.value.trim() === "") {
      // Si el campo queda vacío, recargar todas las tareas
      getTask();
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (query.trim()) {
      actionSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formSearch}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Busca una tarea..."
        className={styles.inputSearch}
      />
      <button
        type="submit"
        className={styles.btnSearch}
        disabled={!query.trim()}
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
}

export default SearchBarTask;
