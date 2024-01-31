import { useEffect, useState, Fragment } from 'react';
import { GetResearch } from '@services/research.service';
import { useNavigate } from 'react-router-dom';
import { IResearch, IResponse } from '@interfaces/research.interface';
import { IPagin } from '@interfaces/pagin.interface';
import { useDispatch } from 'react-redux';
import { setNavLoading } from '@store/nav.store/nav.slice';
import CardMostViewed from './CardMostViewed';
import Carousel from '@components/base/carousel';
import Pagination from '@components/base/pagination';
import CardLastsViewed from './CardLastsViewed';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  const [rawLasts, setRawLasts] = useState<IResearch[]>([]);
  const [rawPopular, setRawPopular] = useState<IResearch[]>([]);
  const [pagin, setPagin] = useState<IPagin>({
    page: 1,
    pageSize: 5,
    total: 0,
    totalPage: 0,
  });

  async function loadDataLasts(page = 1, pageSize = 6, isLoading = true) {
    setLoading(prev => ({ ...prev, lasts: isLoading }));
    const res: IResponse<IResearch[]> = await GetResearch(page, pageSize);
    setLoading(prev => ({ ...prev, lasts: false }));
    if (res && (res?.taskStatus && res?.statusCode === 200)) {
      setRawLasts(res.data);
      res.pagin.pageSize = pageSize;
      setPagin(res?.pagin);
    }
  }

  async function loadDataPopular(page = 1, pageSize = 10, isLoading = true) {
    setLoading(prev => ({ ...prev, popular: isLoading }));
    const res: IResponse<IResearch[]> = await GetResearch(page, pageSize, "desc");
    setLoading(prev => ({ ...prev, popular: false }));
    if (res && (res?.taskStatus && res?.statusCode === 200)) {
      setRawPopular(res.data);
    }
  }

  const handleChangePage = async (id: number) => {
    const state = {
      id: id
    }
    navigate("/research/detail-research", { state });
  }

  useEffect(() => {
    Promise.all([loadDataLasts(), loadDataPopular()])
  }, []);

  useEffect(() => {
    dispatch(setNavLoading((loading.lasts && loading.popular)))
  }, [loading]);

  return (
    <Fragment>
      <div className="cards">
        <div className="mb-6">
          <label className="flex items-center gap-2 font-semibold text-xl sm:text-2xl">
            <FontAwesomeIcon className="text-xl" icon={["fas", "fire"]} />
            ยอดฮิต
          </label>
          <Carousel className="p-2rounded-md">
            <CardMostViewed raw={rawPopular} loading={loading.popular} returnResearch={handleChangePage} />
          </Carousel>
        </div>
        <label className="flex items-center gap-2 font-semibold text-xl sm:text-2xl">
          <FontAwesomeIcon className="text-xl" icon={["fas", "newspaper"]} />
          ล่าสุด
        </label>
        <CardLastsViewed raw={rawLasts} loading={loading.lasts} returnChangePage={handleChangePage} />
        <div className="flex justify-end pt-5">
          <Pagination
            pagin={pagin}
            onPageChange={(page) => {
              loadDataLasts(page, pagin.pageSize);
            }}
          />
        </div>
      </div>
    </Fragment>
  )
}
