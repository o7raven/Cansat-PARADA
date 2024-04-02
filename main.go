package main

import (
	"encoding/json"
	"html/template"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
)

const ver = 2

type member struct {
	Name  string
	Pfp   string
	Roles string
	Bio   string
	socials
}
type socials struct {
	Linkedin string
	Twitter  string
}

func loadMembers() []member {
	_members, err := os.ReadFile("web/data/members.json")
	if err != nil {
		log.Fatal("error trying to read members.json: ", err)
	}
	var members []member
	err = json.Unmarshal(_members, &members)
	if err != nil {
		log.Fatal("func error json.Unmarshal(_members,&members): ", err)
	}
	return members
}

func rootHandler(w http.ResponseWriter, r *http.Request) {
	indexPath := "web/routes/index.html"
	index := template.Must(template.ParseFiles(indexPath))

	err := index.Execute(w, loadMembers())
	if err != nil {
		log.Fatal("error executing the index template: ", err)
	}
}
func main() {
	logFile, err := os.OpenFile("logs.log", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		log.Fatal("error opening the log file: ", err)
	}
	defer logFile.Close()
	log.SetOutput(logFile)

	log.Printf("PARADA site v%d starting...", ver)
	r := mux.NewRouter()
	r.PathPrefix("/assets/").Handler(http.StripPrefix("/assets/", http.FileServer(http.Dir("web/assets"))))
	r.PathPrefix("/modules/").Handler(http.StripPrefix("/modules/", http.FileServer(http.Dir("web/modules"))))
	r.HandleFunc("/", rootHandler)
	http.ListenAndServe(":80", r)
}
