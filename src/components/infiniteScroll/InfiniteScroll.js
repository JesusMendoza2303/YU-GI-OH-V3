/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector } from 'react-redux'

export const InfiniteScroll = () => {
	const { cards = [], isLoading, tarjeta } = useSelector(state => state.cards)
	console.log('🚀 ~ InfiniteScroll ~ cards:', cards)
	console.log('🚀 ~ InfiniteScroll ~ tarjeta:', tarjeta)

	return (
		<div>
			<InfiniteScroll
				dataLength={cards.length} // This is important field to render the next data
				// next={fetchData}
				hasMore={true}
				loader={<h4>Loading...</h4>}
				endMessage={
					<p style={{ textAlign: 'center' }}>
						<b>Yay! You have seen it all</b>
					</p>
				}
				// below props only if you need pull down functionality
				refreshFunction={this.refresh}
				pullDownToRefresh
				pullDownToRefreshThreshold={50}
				pullDownToRefreshContent={
					<h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
				}
				releaseToRefreshContent={
					<h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
				}
			>
				{/* {items} */}
			</InfiniteScroll>
		</div>
	)
}
