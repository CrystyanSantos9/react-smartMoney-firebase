import {useEffect, useState} from 'react';

import {
  getAllCategories,
  getInitCategories,
  getDebitCategories,
  getCreditCategories,
} from '../services/Categories';

const useCategories = () => {
  const [debitCategories, setDebitCategories] = useState([]);
  const [creditCategories, setCreditCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [initCategories, setInitCategories] = useState([]);

  useEffect(() => {
    const loadDebitCategories = async () => {
      const data = await getDebitCategories();
      setDebitCategories(data);
    };

    const loadCreditCategories = async () => {
      const data = await getCreditCategories();
      setCreditCategories(data);
    };

    const loadAllCategories = async () => {
      const data = await getAllCategories();
      setAllCategories(data);
    };

    const loadInitCategory = async () => {
      const data = await getInitCategories();
      setInitCategories(data);
    };

    loadAllCategories();
    loadCreditCategories();
    loadDebitCategories();
    loadInitCategory();
  }, []);

  return [debitCategories, creditCategories, allCategories, initCategories];
};

export default useCategories;
