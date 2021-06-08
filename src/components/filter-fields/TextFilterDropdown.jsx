// const TextFilter = (props) => {

//   const fetchData = (search) => {
//     Api.get( url, { params: { search } })
//       .then((resp) => {
//         setData(resp.data.results.filter()
//       })
//       .catch(() => {
//         setData([]);
//       });
//   };

//   useEffect(() => {
//     fetchData('');
//   }, []);

//   const handleSearch = (e) => {
//     const { value } = e.target;
//     fetchData(value);
//   };

//   return (
//     <TextInput
//       placeholder="search"
//       onChange={onFilter}
//       value={filter}
//       onChange={handleSearch}
//     />
//   );
// };

// TextFilter.propTypes = {
//   onFilter: PropTypes.func.isRequired,
//   filter: PropTypes.string,
//   minLength: PropTypes.number,
// };

// TextFilter.defaultProps = {
//   filter: undefined,
//   minLength: 3,
// };
