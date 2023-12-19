import { IResearch } from '@interfaces/research.interface';
import NotFound from '@components/base/notFound';
import { Fragment } from 'react';
import { CardLoading, CardResearch } from '@components/customs/card';

interface Props {
  loading: boolean;
  raw: IResearch[];
  returnChangePage: (id: number) => void;
}
function CardLastsViewed({ loading, raw, returnChangePage }: Props) {
  return (
    <Fragment>
      <div className="mt-3 sm:mt-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          <CardLoading />
        ) : (
          raw?.length > 0
            ? raw.map((item: IResearch, idx) => (
              <Fragment key={idx}>
                <CardResearch
                  item={item}
                  handleChangePage={returnChangePage}
                  className="md:!p-3"
                />
              </Fragment>
            )) : (
              <NotFound />
            )
        )}
      </div>
    </Fragment>
  )
}

export default CardLastsViewed