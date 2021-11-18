import { Avatar, List } from "antd";
import { useMemo } from "react";
import { useHistory } from "react-router";
import "../index.css";

const SearchUsersTab = ({
  searchWord,
  users,
}: {
  searchWord: string;
  users: Array<any>;
}) => {
  const history = useHistory();
  const filteredUsers = useMemo(() => {
    return searchWord === ""
      ? users
      : users.filter((user) => {
          return user.username.toLowerCase().includes(searchWord.toLowerCase());
        });
  }, [searchWord]);

  return (
    <div id="search-users">
      <List
        size="large"
        itemLayout="horizontal"
        dataSource={filteredUsers}
        style={{ textAlign: "left", cursor: "pointer" }}
        renderItem={(user) => (
          <List.Item onClick={() => history.push(`/${user.username}`)}>
            <List.Item.Meta
              avatar={<Avatar>{user?.username[0]}</Avatar>}
              title={<a href="https://ant.design">{user?.username}</a>}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default SearchUsersTab;
