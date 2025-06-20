import React from "react";
import styles from "./TablePosts.module.scss";

import {
  Table,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { BsThreeDotsVertical } from "react-icons/bs";

const TablePosts = ({
  posts,
  setSelectedPost,
  toggleEditModal,
  toggleDeleteModal,
  toggleViewModal,
}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(null);

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  return (
    <Table responsive className={styles["table"]}>
      <thead className={styles["table-head"]}>
        <tr>
          <th>Title</th>
          <th>Content</th>
          <th>Date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {posts.length === 0 ? (
          <tr>
            <td colSpan={4}>No posts yet</td>
          </tr>
        ) : (
          posts.map((post, index) => (
            <tr key={index}>
              <td>{post.title}</td>
              <td>{post.message}</td>
              <td>{new Date(post.createdAt).toLocaleDateString()}</td>
              <td>
                <Dropdown
                  isOpen={dropdownOpen === index}
                  toggle={() => toggleDropdown(index)}
                >
                  <DropdownToggle
                    tag="span"
                    onClick={() => toggleDropdown(index)}
                    data-toggle="dropdown"
                    aria-expanded={dropdownOpen === index}
                    className={styles["table-body-dropdown"]}
                  >
                    <BsThreeDotsVertical />
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem
                      onClick={() => {
                        setSelectedPost(post);
                        toggleViewModal();
                        setDropdownOpen(null);
                      }}
                    >
                      View
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        setSelectedPost(post);
                        toggleEditModal();
                        setDropdownOpen(null);
                      }}
                    >
                      Edit
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        setSelectedPost(post);
                        toggleDeleteModal();
                        setDropdownOpen(null);
                      }}
                    >
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};

export default TablePosts;
