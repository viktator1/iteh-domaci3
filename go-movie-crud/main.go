package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

type Movie struct {
	ID       string    `json:"id"`
	Isbn     string    `json:"isbn"`
	Title    string    `json:"title"`
	Director *Director `json:"director"`
}

type Director struct {
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
}

//movies := make([]Movie,2)
var movies []Movie
var peoples []Person

func init() {
	// director1 := Director{
	// 	FirstName: "Milan",
	// 	LastName:  "Matematika",
	// }
	// movies = append(movies, Movie{ID: "1", Isbn: "533156", Title: "Avatar", Director: &director1})
	// movies = append(movies, Movie{ID: "2", Isbn: "931856", Title: "Predestination", Director: &Director{FirstName: "Zourna"}})
	// movies = append(movies, Movie{ID: "3", Isbn: "241856", Title: "Rocky", Director: &Director{LastName: "Mile"}})

	peoples = append(peoples, Person{Id: 1, Ime: "Zouran", Prezime: "Jovanovic", Godine: 43, Jmbg: "1234"})
	peoples = append(peoples, Person{Id: 2, Ime: "Milan", Prezime: "Popovic", Godine: 21, Jmbg: "1235"})
	peoples = append(peoples, Person{Id: 3, Ime: "Jovan", Prezime: "Petrovic", Godine: 32, Jmbg: "1236"})
	peoples = append(peoples, Person{Id: 4, Ime: "Goran", Prezime: "Ilic", Godine: 12, Jmbg: "1237"})
	peoples = append(peoples, Person{Id: 5, Ime: "Aaa", Prezime: "Anic", Godine: 22, Jmbg: "1238"})
}

func Middleware(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:4200/")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	})
}

func main() {

	cors := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{
			http.MethodPost,
			http.MethodGet,
			http.MethodPut,
			http.MethodDelete,
		},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: false,
	})
	r := mux.NewRouter()
	handler := cors.Handler(r)

	// r.HandleFunc("/movies", getMovies).Methods("GET")
	// r.HandleFunc("/movie", getMovie).Methods("GET")
	// r.HandleFunc("/movies", deleteMovies).Methods("DELETE")
	r.HandleFunc("/peoples", getPeoples).Methods("GET")
	r.HandleFunc("/peoples", addPerson).Methods("POST")
	r.HandleFunc("/peoples/{id}", updatePerson).Methods("PUT")
	r.HandleFunc("/peoples/{id}", deletePerson).Methods("DELETE")

	fmt.Println("Listen and serve on port 8000\n")
	log.Fatal(http.ListenAndServe(":8000", handler))
}

func getMovies(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	time.Sleep(5000)
	json.NewEncoder(w).Encode(movies)
}

/*func getMovie(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	time.Sleep(5000)
	id := r.URL.Query().Get("id")
	for _, movie := range movies {
		if movie.ID == id {
			json.NewEncoder(w).Encode(movie)
			return
		}
	}
}

func deleteMovies(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	queryParam := r.URL.Query().Get("id")
	id, err := strconv.Atoi(queryParam)
	id = id - 1
	if err != nil {
		w.Write([]byte("id not found"))
		return
	}
	var deleted Movie
	if id > 0 && id < len(movies) {
		deleted = movies[id]
		movies = append(movies[:id], movies[id+1:]...)
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(deleted)
	} else {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("id doen't exist"))
	}
}
*/
func getPeoples(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(peoples)
}

func addPerson(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	dec := json.NewDecoder(r.Body)
	dec.DisallowUnknownFields()
	var person Person
	err := dec.Decode(&person)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	person.Id = getId()
	peoples = append(peoples, person)
	json.NewEncoder(w).Encode(person)
	// fmt.Fprintf(w, "Person: %+v", person)
}

func updatePerson(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	idMap := mux.Vars(r)
	idString := idMap["id"]
	id, _ := strconv.Atoi(idString)
	var person Person
	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&person)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
	}
	for i := 0; i < len(peoples); i++ {
		if peoples[i].Id == id {
			peoples[i] = person
			return
		}
	}
}

func deletePerson(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	idMap := mux.Vars(r)
	idString := idMap["id"]
	id, _ := strconv.Atoi(idString)
	for i := 0; i < len(peoples); i++ {
		if peoples[i].Id == id {
			person := peoples[id]
			json.NewEncoder(w).Encode(person)
			peoples = append(peoples[:i], peoples[i+1:]...)
			return
		}
	}
	w.WriteHeader(http.StatusBadRequest)
	err := "Person with id:'" + idString + "' doesn't exist"
	w.Write([]byte(err))
	return

}

func getId() int {
	for result := 1; result < 1000000; result++ {
		sadrzi := false
		for _, person := range peoples {
			if person.Id == result {
				sadrzi = true
				break
			}
		}
		if !sadrzi {
			return result
		}
	}
	return 0
}
