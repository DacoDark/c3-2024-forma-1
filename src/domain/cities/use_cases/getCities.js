import citiesRepository from '../repository/worldCitiesRespository'

exports.getAllCitiesUseCase = (ctx) => {
    ctx.body = citiesRepository.getAllCitiesRepository()
    return ctx
}

exports.getCitiesByCountryUseCase = (ctx) => {
    
    const cities = citiesRepository.searchCitiesByCountryName(ctx.params.country);
    
    
    if (cities.length === 0) {
        ctx.status = 200;
        ctx.body = { message: "No se encontraron ciudades para el país ingresado" };
    } 
    
    else if (cities.length < 3){
        ctx.status = 400;
        ctx.body = { message: "El país especificado debe tener al menos 3 caracteres" };
        return ctx;
    } 
    else {
        ctx.body = cities;
    }
    return ctx
    
}

exports.getCitiesByCityNameAndCountryUseCase = (ctx) => {
    ctx.body = citiesRepository.searchCityByCityNameAndCountry(ctx.params.city, ctx.params.country)
    return ctx
}