import "../index.css";
import { useState } from "react";
import { Input, Tabs, Divider } from 'antd';
import SearchUsersTab from "../Components/SearchUsersTab";
import SearchTagsTab from "../Components/SearchTagsTab";
import SearchClipsTab from "../Components/SearchClipsTab";

const { Search } = Input;
const { TabPane } = Tabs;

function callback(key: any) {
  console.log(key);
}

const Searching = (props: any) => {
  const [searchField, setSearchField] = useState("");
  const [searchShow, setSearchShow] = useState(false);

  const onSearch = (e: any) => {
    setSearchField(e);
    if(e===""){
      setSearchShow(false);
    }
    else {
      setSearchShow(true);
    }
    console.log(e);
  };

  const searchList = (tab: string) => {
    if(searchShow) {
      switch(tab) {
        case "Users":
          return ( <SearchUsersTab searchWord={searchField}/> );
        case "Tags":
          return ( <SearchTagsTab searchWord={searchField}/> );
        case "Clips":
          return ( <SearchClipsTab searchWord={searchField}/> );
      };
    };   
  }

  return (
    <div id="search" className="page-layout">
      <Search
        placeholder="search..."
        allowClear
        onSearch={onSearch}
      />
      <Divider/>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Users" key="1">
          {searchList("Users")}
        </TabPane>
        <TabPane disabled tab="Tags" key="2">
          {searchList("Tags")}
        </TabPane>
        <TabPane tab="Clips" key="3">
          {searchList("Clips")}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Searching;