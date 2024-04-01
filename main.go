package main

import (
	"html/template"
	"log"
	"net/http"
	"os"
)

const ver = 2

func rootHandler(w http.ResponseWriter, r *http.Request) {
	indexPath := "web/index.html"
	index, err := template.New(indexPath).ParseFiles(indexPath)
	if err != nil {
		log.Fatal("error opening opening indexPath: ", indexPath, err)
	}
	err = index.Execute(w, nil)
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
	http.HandleFunc("/", rootHandler)
	http.ListenAndServe(":80", nil)
}
