function sort_for_namination(route) {
    if (route) arrayComm.sort((a,b)=> a.nomination - b.nomination)
    else arrayComm.sort((a,b)=> b.nomination - a.nomination)
}
