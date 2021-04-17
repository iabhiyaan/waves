import React, { Component, createRef } from 'react';
import PageTop from '../utils/PageTop';

import { connect } from 'react-redux';
import { getProductsToShop, getBrands, getWoods } from '../../store/actions/product_action'; 
import { frets, price } from '../utils/Form/FixedCategories';

import CollapseCheckbox from '../utils/CollapseCheckbox';
import CollapseRadio from '../utils/CollapseRadio';
import LoadMoreCard from './LoadMoreCard';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faTh} from '@fortawesome/free-solid-svg-icons';


class Shop extends Component {
    wrapper = createRef();
    state={
        grid:'',
        limit:6,
        skip:0,
        filters:{
            brand:[],
            frets:[],
            wood:[],
            price:[]
        }
    }
    componentDidMount(){
        this.props.dispatch(getBrands());
        this.props.dispatch(getWoods());

        this.props.dispatch(getProductsToShop(
            this.state.skip,
            this.state.limit,
            this.state.filters
        ))
    }
    handlePrice =(value)=>{
        const data = price;
        let array = [];
        for(let key in data){
            if(data[key]._id === parseInt(value,10)){
                array = data[key].array
            }
        }
        return array;
    }
    handleFilters = (filters, categories)=>{
        const newFilters = {...this.state.filters}
        newFilters[categories] = filters;

        if(categories === 'price'){
            let priceValue = this.handlePrice(filters);
            newFilters[categories] = priceValue
        }
        this.showFilteredResults(newFilters)
        this.setState({
            filters:newFilters
        })
    }
    showFilteredResults = (filters)=>{
        this.props.dispatch(getProductsToShop(
            0,
            this.state.limit,
            filters
        )).then(()=>{
            this.setState({
                skip:0
            })
        })
    }
    loadMoreCards = ()=>{
        let skip = this.state.skip + this.state.limit;
        this.props.dispatch(getProductsToShop(
            skip,
            this.state.limit,
            this.state.filters,
            this.props.products.toShop
        )).then(()=>{
            this.setState({
                skip
            })
        })

    }
    handleGrid = ()=>{
        this.setState({
            grid:!this.state.grid ? 'grid_bars':''
        })
        // console.log('grid')
    }
    render() {
        const products = this.props.products;

        return (
            <div >
                <PageTop
                    title="Browse Products"
                />

                <div className="container">
                    <div className="shop_wrapper">
                        <div ref={this.wrapper} className="left">
                            
                            <CollapseCheckbox 
                                initState={true}
                                title="Brands"
                                list={products.brands}
                                handleFilters={(filters)=>this.handleFilters(filters, 'brand')}
                                />
                            <CollapseCheckbox 
                                initState={false}
                                title="Frets"
                                list={frets}
                                handleFilters={(filters)=>this.handleFilters(filters, 'fret')}
                                />
                            <CollapseCheckbox 
                                initState={false}
                                title="Woods"
                                list={products.woods}
                                handleFilters={(filters)=>this.handleFilters(filters, 'wood')}
                                />
                            <CollapseRadio 
                                initState={true}
                                title="Price"
                                list={price}
                                handleFilters={(filters)=>this.handleFilters(filters, 'price')}
                                />


                        </div>
                        <div className="right">
                            <div className="shop_options">
                                <div className="shop_grids clear">
                                    <div className={`grid_btn ${this.state.grid ? '': 'active'}`}
                                        onClick ={()=>this.handleGrid()}
                                    >
                                        <FontAwesomeIcon icon={faTh} />
                                    </div>
                                    <div className={`grid_btn ${!this.state.grid ? '': 'active'}`}
                                        onClick ={()=>this.handleGrid()}
                                    >
                                        <FontAwesomeIcon icon={faBars} />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <LoadMoreCard
                                    typeName= {'Guitar'}
                                    grid={this.state.grid}
                                    limit={this.state.limit}
                                    size={products.toShopSize}
                                    products = {products.toShop}
                                    loadMore = {()=>this.loadMoreCards()}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state)=>{
    return{
        products:state.products
    }
}
export default connect(mapStateToProps)(Shop);