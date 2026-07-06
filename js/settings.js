function getStatistics(subjectId){

    const all =
        JSON.parse(
            localStorage.getItem("statistics")
        ) || {};

    const stats = all[subjectId];

    if(!stats){

        return{

            best:0,

            average:0,

            attempts:0

        };

    }

    return{

        best:stats.best,

        average:Math.round(stats.average),

        attempts:stats.attempts

    };

}