import React from 'react';

interface Props {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<Props> = ({ search, setSearch }) => {
  return (
    <div className="mb-8">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by title, ingredients, or tags"
        className="input w-full"
      />
    </div>
  );
};

export default SearchBar;
