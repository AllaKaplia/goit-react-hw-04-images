import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { MdOutlineImageSearch } from 'react-icons/md';
import { Header, FormBox, ButtonForm, LabelButton, Input } from './SearchBar.styled';

export default function SearchBar({ onSubmit }) {
  const [imageName, setImageName] = useState('');

  const handleImagesNameChange = (evt) => {
    setImageName(evt.currentTarget.value.toLowerCase());
  }

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    if(imageName.trim() === ''){
      toast.error('Enter a name for the images!')
      return;
    }

    onSubmit(imageName);
    setImageName('');
  }

  return (
    <Header>
      <FormBox onSubmit={handleFormSubmit}>
        <ButtonForm type="submit">
          <MdOutlineImageSearch />
          <LabelButton>Search</LabelButton>
        </ButtonForm>

        <Input
          type="text"
          value={imageName}
          onChange={handleImagesNameChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </FormBox>
    </Header>
  );
}