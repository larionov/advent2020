(ns advent2020.day4.part1
  (:require [clojure.core :refer [slurp]]
            [clojure.java.io :as io]
            [clojure.string :as str]))

(def data (-> "day4/input_light.txt"
              io/resource
              slurp
              (str/split #"\n\n")))

data

;;(str/split
(defn str->pairs [item]
  (->> (str/split item #"[ \n]")
       (map #(str/split % #":"))
       (map (fn [ [ a b ] ] [ (keyword "day04" a) b]))
       ))

(def data-map (->> (map str->pairs data)
                   (map #( into {} %))
                   (map #(dissoc % :day04/cid))
                   ))
(str->pairs (first data))
data-map

(def field-strings ["byr" "yir" "eyr" "hgt" "hcl" "ecl" "pid"])
(def fields (set (map #(keyword "day04" %) field-strings)))

(fields (first data-map))
data-map
(defn part1 [d]
  (->> d
       (filter #(= (set (keys %)) fields))
;;       count
       ))

(part1 data-map)
