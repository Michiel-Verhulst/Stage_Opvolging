"use client";
import React, { useContext } from 'react';
import LanguageContext from './LanguageContext';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Spacer} from "@nextui-org/react";

const LanguageToggle = () => {
  const { language, toggleLanguage } = useContext(LanguageContext);

  const handleLanguageChange = (newLanguage: String) => {
    if(newLanguage === language) return;
    toggleLanguage(newLanguage);
  }

  return (
  <>
    <Spacer x={1.5} />
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {language}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleLanguageChange('CHN')}>
          CHN
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange('DE')}>
          DE
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange('EN')}>
          EN
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange('IT')}>
          IT
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange('NL')}>
          NL
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange('SE')}>
          SE
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </>
  );
};

export default LanguageToggle;