import React, { useState, useEffect, useRef } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import styles from './dropdownButton.module.css';

interface ProfileButtonProps {
  children: React.ReactNode;
  buttonTitle: string;
}

const DropdownButton: React.FC<ProfileButtonProps> = ({
  children,
  buttonTitle,
}) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const hideDropdown = () => {
    setDropdownVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        hideDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <span
      ref={dropdownRef}
      className={`${styles.dropdown_container} ${
        isDropdownVisible ? styles.show_dropdown : ''
      }`}
    >
      <button className={styles.btn} onClick={toggleDropdown}>
        {buttonTitle}
        {isDropdownVisible ? (
          <IoMdArrowDropup size={20} />
        ) : (
          <IoMdArrowDropdown size={20} />
        )}
      </button>

      {isDropdownVisible && (
        <ul className={styles.dropdown_list_box} onClick={hideDropdown}>
          {children}
        </ul>
      )}
    </span>
  );
};

export default DropdownButton;
