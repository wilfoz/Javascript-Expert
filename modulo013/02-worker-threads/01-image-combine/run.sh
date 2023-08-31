IMAGE_URL="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZktEMwr96gNzLHisHR_ur9FB3kEzyEkMUKQ&usqp=CAU"
BACKGROUND_URL="https://cdn.marvel.com/content/2x/hfg_xmen_0.jpg"

curl "http://localhost:3000/joinImages?img=$IMAGE_URL&background=$BACKGROUND_URL"
autocannon --renderStatusCodes -c500 "http://localhost:3000/joinImages?img=$IMAGE_URL&background=$BACKGROUND_URL"