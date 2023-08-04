import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Form, Button } from "react-bootstrap"

const SearchBox = () => {

    const { keyword } = useParams();
    const navigate = useNavigate();

    const [searchKeyword, setSearchKeyword] = useState(keyword || "");

    const submitHandler = (e) => {
        e.preventDefault();
        if(searchKeyword.trim()) {
            setSearchKeyword("");
            navigate(`/search/${searchKeyword}`);
        } else {
            navigate("/");
        }
    }
  return (
    <>
        <Form onSubmit={submitHandler} className="d-flex">
            <Form.Control type="text" name="q" onChange={(e) => setSearchKeyword(e.target.value)} placeholder="Search Products..." className="mr-sm-2 ml-sm-5" style={{marginRight: "20px"}} value={searchKeyword} />
            <Button type="submit" variant="outline-light" className="p-2">Search</Button>
        </Form>
    </>
  )
}

export default SearchBox