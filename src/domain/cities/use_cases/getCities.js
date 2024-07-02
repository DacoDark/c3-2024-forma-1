import citiesRepository from '../repository/worldCitiesRespository'

exports.getAllCitiesUseCase = (ctx) => {
    ctx.body = citiesRepository.getAllCitiesRepository()
    return ctx
}

exports.getCitiesByCountryUseCase = (ctx) => {
    
    const country_search = ctx.params.country
    const cities = citiesRepository.searchCitiesByCountryName(ctx.params.country);
    let contiene_numero = false
    for (let letra of country_search){
        if(!isNaN(letra)){
            contiene_numero = true;
            break;//Se termina el bucle al encontrar un numero
        }
    }
        
    if (country_search.length < 3){
        ctx.status = 400;
        ctx.body = { error: "El país especificado debe tener al menos 3 caracteres" };
        return ctx;
    }
    
    if (contiene_numero){
        ctx.status = 400;
        ctx.body = { message: 'Solo se aceptan caracteres no numéricos' }
        return ctx;
    }

    if (cities.length === 0) {
        ctx.status = 200;
        ctx.body = { message: "No se encontraron ciudades para el país ingresado" };
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