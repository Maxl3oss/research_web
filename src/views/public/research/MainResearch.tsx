import { useEffect, useState, Fragment } from 'react';
import { GetResearch } from '@services/research.service';
import { useNavigate } from 'react-router-dom';
import { IResearch, IResponse } from '@interfaces/research.interface';
import { IPagin } from '@interfaces/pagin.interface';
import { useDispatch } from 'react-redux';
import { setNavLoading } from '@store/nav.store/nav.slice';
import CardMostViewed from './CardMostViewed';
import Carousel from '@components/base/carousel';
import { debounce } from "lodash"
import Pagination from '@components/base/pagination';
import CardLastsViewed from './CardLastsViewed';

interface ILoading {
  popular: boolean;
  lasts: boolean;
}

export default function MainResearch() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<ILoading>({
    popular: true,
    lasts: true,
  });
  const [raw, setRaw] = useState<IResearch[]>([]);
  const [pagin, setPagin] = useState<IPagin>({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPage: 10,
  });


  const loadData = debounce(async (page: number, pageSize: number, isLoading = true) => {
    setLoading({
      popular: isLoading,
      lasts: isLoading,
    });
    const response: IResponse<IResearch[]> = await GetResearch(page, pageSize);
    if (response?.taskStatus && response?.statusCode === 200) {
      setRaw(response.data);
    }
    setLoading(prev => ({ ...prev, popular: false }));
    setTimeout(() => {
      setLoading(prev => ({ ...prev, lasts: false }));
    }, 500)
  }, 500);

  const handleChangePage = async (id: number) => {
    const state = {
      id: id
    }
    navigate("/research/detail-research", { state });
    // navigate("/research/create", { state });
  }

  useEffect(() => {
    loadData(pagin.page, pagin.pageSize);
  }, []);

  useEffect(() => {
    dispatch(setNavLoading((loading.lasts && loading.popular)))
  }, [loading]);

  return (
    <Fragment>
      <div className="cards">
        <div className="mb-6">
          <label className="flex items-center gap-2 font-semibold text-xl sm:text-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
            </svg>
            ยอดฮิต
          </label>
          <Carousel className="p-2rounded-md">
            <CardMostViewed raw={raw} loading={loading.popular} returnResearch={handleChangePage} />
          </Carousel>
        </div>
        <label className="flex items-center gap-2 font-semibold text-xl sm:text-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
          </svg>
          ล่าสุด
        </label>
        <CardLastsViewed returnChangePage={handleChangePage} loading={loading.lasts} raw={raw} />
        <div className="flex justify-end pt-5">
          <Pagination
            pagin={pagin}
            onPageChange={(curr) => {
              setPagin((prev) => ({
                ...prev,
                page: curr
              }));
            }}
          />
        </div>
      </div>
    </Fragment>
  )
}
